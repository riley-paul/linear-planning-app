const User = require("../models/User")
const router = require("express").Router();

// update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt
      }
    }


  } else {
    return res.status(403).json("Can only update your own account")
  }
})

// delete user
// get a user
// follow a user
// unfollow a user



module.exports = router;
