const router = require("express").Router();
const axios = require("axios");
const createJWT = require("./createJWT");

const INSERT_USER_ONE_QUERY = `
mutation insert_users_one($email: String, $email_verified: Boolean, $gender: String, $locale: String, $name: String, $avatar_url: String, $google_id: String) {
  insert_users_one(object: {email: $email, email_verified: $email_verified, gender: $gender, locale: $locale, name: $name, avatar_url: $avatar_url, google_id: $google_id},
  on_conflict: {update_columns: updated_at, constraint: users_google_id_key}) {
    id
    email
    email_verified
    gender
    locale
    name
    avatar_url
    google_id
    created_at
    updated_at
    role
  }
}
`;

router.get("/", (req, res) => {
  res.send(
    "<h3>⚡️ Auth Server for Hasura Backend</h3>" + JSON.stringify(req.query)
  );
});

/*
 * Create/update user and get new token
 * Steps:
 * get user -> access the db and get the role
 * create token with user_id and user_role and return new user with token and role
 */
router.post("/login/token", async (req, res) => {
  console.log("⚡️ User from api /login/token", req.body.user);

  try {
    //
    // Create / update user in the DB
    //
    const resultUser = await axios({
      url: "http://localhost:4000/v1/graphql", // todo url
      method: "post",
      headers: {
        "x-hasura-admin-secret": "adminpassword", // todo adminpassword
      },
      data: {
        query: INSERT_USER_ONE_QUERY,
        variables: { ...req.body.user },
      },
    });
    console.log("🎹", resultUser.data);
    const user = resultUser.data.data.insert_users_one;

    //
    // Get the token for this user
    //
    const token = createJWT(user.id, user.role);
    // console.log('🎹 token', token)
    res.json({ user, token });
  } catch (error) {
    console.error("❌ Error in creating the user", error);
    res.send(error);
  }

  // if (req.body.user_id) {
  //   const token = createJWT(req.body.user_id, req.body.user_role);
  //   res.send(token);
  // } else {
  //   res.send("<h3>❌ No user defined</h3>");
  // }
});

// // Insert user in the database everytime a user is logged in
// router.post("/api/auth/insert_user", async (req, res) => {
//   console.log(" USEER LOGGED IN");
// });

module.exports = router;
