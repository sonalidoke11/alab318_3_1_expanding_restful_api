import { Router } from "express";
import { posts } from "../data/posts.js";
import { error } from "../utils/error.js";

const postsRouter = Router();

/**
 * GET
 */
postsRouter.get("/", (req, res) => {
  console.log("APIKEY =  ", req.key);
  res.json(posts);
});

/**
 * GET id
 */
postsRouter.get("/:id", (req, res, next) => {
  console.log(req.params);
  const post = posts.find((post) => post.id == req.params.id);
  if (post) {
    res.json(post);
  } else {
    next(error(404, "Data not found!")); // calls the custom 404 middleware
  }
});



/**
 * POST
 */
postsRouter.post("/", (req, res) => {
  console.log(req.body);

  if (req.body.userId && req.body.title && req.body.content) {
    // if (posts.find((u) => u.userId == req.body.userId)) {
    //   res.json({ error: "userId Already Taken" });
    //   return;
    // }

    const post = {
      id: posts[posts.length - 1].id + 1,
      userId: req.body.userId,
      title: req.body.title,
      content: req.body.content,
    };

    posts.push(post);
    res.json(posts[posts.length - 1]);
  }
});

/**
 * PATCH OR UPDATE by id
 */
postsRouter.patch("/:id", (req, res, next) => {
  console.log(req.params);

  const post = posts.find((u, i) => {
    if (u.id == req.params.id) {
      for (const key in req.body) {
        posts[i][key] = req.body[key];
      }
      return true;
    }
  });

  if (post) res.json(post);
  else next();
});

/**
 * DELETE by id
 */
postsRouter.delete("/:id", (req, res, next) => {
  console.log(req.params);

  const post = posts.find((u, i) => {
    if (u.id == req.params.id) {
      posts.splice(i, 1);
      return true;
    }
  });

  if (post) res.json(post);
  else next();
});

export default postsRouter;