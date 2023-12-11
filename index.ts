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

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(PORT);
});
