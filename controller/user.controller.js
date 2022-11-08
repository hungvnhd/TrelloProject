module.exports.renderHomepage = (req, res) => {
  res.render("homepage.ejs");
};
module.exports.renderBoard = (req, res) => {
  res.render("workspaceBoard.ejs");
};



module.exports.renderAdmin =(req, res)=>{
  res.render("admin.ejs")
}

module.exports.renderUserProfile =(req, res)=>{
  res.render("userprofile")
}