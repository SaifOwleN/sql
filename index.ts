import express from "express";
import { DataTypes, Model, Sequelize } from "sequelize";
import cors from "cors";
require("dotenv").config();
const app = express();
app.use(express.json());

const sequelize = new Sequelize(process.env.DB as string);

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
  },
);

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

app.get("/api/blogs/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
  }
});

app.post("/api/blogs", async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
});

app.delete("/api/blogs/:id", async (req, res) => {
  await Blog.destroy({ where: { id: req.params.id } });
  res.status(200).end();
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(PORT);
});
