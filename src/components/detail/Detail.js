import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
const Detail = () => {
  const starRateRef = useRef();
  const commentRef = useRef();
  const [movie, setMovie] = useState({
    id: "",
    image: "",
    name: "",
    type: "",
    year: "",
    description: "",
    rate: "",
  });
  const [userComment, setUserComment] = useState({
    id: "",
    movie_id: "",
    rateStar: "",
    comment: "",
    account_id: "",
  });
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    var user = JSON.parse(localStorage.getItem("user"));
    var movies = JSON.parse(localStorage.getItem("movies"));
    var types = JSON.parse(localStorage.getItem("types"));
    var rates = JSON.parse(localStorage.getItem("reviews"));
    var accounts = JSON.parse(localStorage.getItem("accounts"));
    if (
      typeof movies === "undefined" ||
      typeof types === "undefined" ||
      typeof rates === "undefined" ||
      typeof accounts === "undefined"
    ) {
      return navigate("/login");
    }
    var movieDetail = movies?.find((m) => m.id == slug);
    var typeDetail = types?.find((m) => m.id == slug);
    if (typeof movieDetail === "undefined" || typeof typeDetail === "undefined") {
      return navigate("/login");
    }

    if (accounts.length === 0 || rates.length === 0) {
      return;
    }
    var account;
    var totalRate = 0;
    var totalCount = 0;

    var movie_rate = rates
      ?.filter((e) => e.movie_id === movieDetail.id)
      ?.filter((e) => {
        account = accounts?.find((a) => a.id === e.account_id);
        if (account.id === user?.id) {
          setUserComment({ ...e });
        }
        totalRate = totalRate + e.rateStar;
        totalCount++;
        if (e.comment !== "") {
          return { ...e };
        } else {
          return false;
        }
      })
      ?.map((e) => {
        console.log(e);
        account = accounts.find((a) => a.id === e.account_id);
        return { ...e, ownerName: account.username };
      });

    setMovie({ ...movieDetail, rate: totalRate / totalCount, type: typeDetail.name });
    setComments([...movie_rate]);
    setUsers([...accounts]);
  }, [navigate, movie.id, slug]);

  const RateFormAppear = () => {
    var user = JSON.parse(localStorage.getItem("user"));

    if (user === null) {
      return (
        <button className="rateButton text" onClick={() => navigate("/login")}>
          Đánh giá
        </button>
      );
    } else {
      return (
        <div className="comments">
          <h1 className=" textTitle bold">Chi tiết đánh giá:</h1>
          <form id="CommentForm" onSubmit={(e) => handleSubmitComment(e)}>
            <label htmlFor="starRate" className="text">
              Điểm đánh giá:
            </label>
            <input type="number" className="commentStarRate" ref={starRateRef} />
            <div className="warn" id="startRateWarn"></div>
            <div className="text">Bình luận:</div>
            <textarea type="text" cols="100" rows="5" ref={commentRef} />
            <button className="rateButton text" type="submit">
              Đánh giá
            </button>
          </form>
        </div>
      );
    }
  };
  const handleSubmitComment = (e) => {
    e.preventDefault();
    var user = JSON.parse(localStorage.getItem("user"));

    if (user === null) {
      return navigate("/login");
    }
    const newCommentForm = {
      starRate: starRateRef.current.value,
      comment: commentRef.current.value,
    };
    if (newCommentForm.rateStar < 0 || newCommentForm.rateStar > 10) {
      document.querySelector("#startRateWarn").innerHTML = "Điểm đánh giá cần nằm trong khoảng từ 0 đến 10";
      return;
    } else {
      document.querySelector("#startRateWarn").innerHTML = "";
    }
    var newComment = {
      id: "",
      movie_id: movie.id,
      rateStar: newCommentForm.rateStar,
      comment: newCommentForm.comment,
      account_id: user.id,
    };
    if (userComment.account_id === "") {
      newComment = { ...newComment, id: users[users.length - 1].id + 1 };
      comments.push(newComment);
    } else {
      newComment = { ...newComment, id: userComment.id };
      var index = comments.findIndex((c) => c.id === userComment.id);

      comments[index] = newComment;
    }

    localStorage.setItem("reviews", JSON.stringify(comments));
  };

  return (
    <div id="movieDetail">
      <div className="image">
        <img alt="movieImage" src={movie.image} />
      </div>
      <div className="movieInfor">
        <div className="detailInfor">
          <h1 className=" textTitle bold">{movie.name}</h1>
          <div className="inforTech text">
            <span className="bold">Thể loại: </span>
            {movie.type}
          </div>
          <div className="inforTech text">
            <span className="bold">Điểm đánh giá: </span>
            {movie.rate}
          </div>
          <div className="inforTech text">
            <span className="bold">Mô tả: </span> {movie.description}
          </div>
        </div>
        <RateFormAppear />
        <div className="detailRate">
          <h1 className=" textTitle bold">Bình luận</h1>
          <div id="commentMessage"></div>
          {comments.length !== 0 ? (
            comments.map((e) => (
              <div id={e.id} key={e.id} className="text comment">
                <span className="bold">{e.ownerName}</span>: {e.comment}
              </div>
            ))
          ) : (
            <div id="commentMessage" className="text">
              Không có comment cho đến thời điểm hiện tại
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
