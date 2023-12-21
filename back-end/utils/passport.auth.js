const express = require("express");
const passport = require("passport");
const User = require("../models/user.model");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env["GOOGLE_CLIENT_ID"],
        clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
        callbackURL: "/oauth2/redirect/google",
        scope: ["profile"],
      },
      catchAsyncErrors(async function (accessToken, refreshToken, profile, cb) {
        try {
          const user = await User.findOne({ googleId: profile.id });
          if (user) {
            return cb(null, user);
          } else {
            const newUser = new User({
              googleId: profile.id,
              username: profile.displayName,
              email: profile.emails[0].value,
              password: profile.id,
            });
            await newUser.save();
            return cb(null, newUser);
          }
        } catch (err) {
          return cb(err);
        }
      })
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
