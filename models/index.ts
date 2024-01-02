import Blog from "./blog";
import ReadingList from "./readingList";
import Session from "./sessions";
import User from "./user";

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: "read_blogs" });
Blog.belongsToMany(User, { through: ReadingList, as: "read_users" });

export { Blog, User, ReadingList, Session };
