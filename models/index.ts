import Blog from "./blog";
import Membership from "./membership";
import Team from "./team";
import User from "./user";
import UserBlogs from "./userBlogs";

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Team, { through: Membership });
Team.belongsToMany(User, { through: Membership });

User.belongsToMany(Blog, { through: UserBlogs, as: "marked_blogs" });
Blog.belongsToMany(User, { through: UserBlogs, as: "users_marked" });

export { Blog, User, Team, Membership };
