const express = require('express');
const router = express.Router();
const config = require('../config/config')
const models = require('../models');
const jwt = require('jsonwebtoken');

router.post('/signin', (req, res) => {
  var reqUsername = req.body.username;
  var reqPassword = req.body.password;
  models.db.Users.findOne({
      where: {
        username: reqUsername
      }
    })
    .then(user => {
      if (user == null || user == undefined) {
        let data = {
          success: false,
          message: '일치하는 회원정보가 없습니다.'
        }
        res.status(400).json(data);
      }
      if (user.password !== reqPassword) {
        let data = {
          success: false,
          message: '회원 아이디와 비밀번호 정보가 일치하지 않습니다.'
        }
        res.status(400).json(data);
      }
      var secret = config.salt;
      let token = jwt.sign({
        user: {
          uId: user.uId,
          username: user.userName
        }
      }, secret, {
        algorithm: config.jwtAlgorithm
      });
      models.db.Users.update({
        isOnline: true
      }, {
        where: {
          username: reqUsername
        }
      }).then(result => {
        let data = {
          success: true,
          message: '로그인에 성공하였습니다.',
          token: token
        }
        res.status(200).json(data);
      }).catch(err => {
        console.log('로그인 프로세스 오류 : ' + err);
      });

    }).catch(err => {
      console.log('로그인 프로세스 오류 : ' + err);
    })
});

router.post('/signup', (req, res) => {
  var reqUsername = req.body.username;
  var reqPassword = req.body.password;
  var reqDescription = req.body.description;
  models.db.Users.findOne({
    where: {
      username: reqUsername
    }
  }).then(user => {
    if (!user) {
      models.db.Users.create({
        userName: reqUsername,
        password: reqPassword,
        description: reqDescription,
      }).then(result => {
        let data = {
          success: true,
          message: '회원가입에 성공하였습니다.'
        }
        res.status(200).json(data);
      }).catch(err => {
        console.log('회원가입 프로세스 오류 : ' + err);
      })

    } else {
      let data = {
        success: false,
        message: '이미 가입되어있는 계정입니다.'
      }
      res.status(400).json(data);
    }
  }).catch(err => {
    console.log('회원가입 프로세스 오류 : ' + err);
  })

});

router.get('/info', (req, res) => {
  var token = req.token;
  if (typeof token === undefined) {
    let data = {
      success: false,
      message: "권한이 없습니다. 로그인을 진행해 주세요."
    }
    res.status(400).json(data);
    return;
  } else {
    models.db.Users.findOne({
      where: {
        uid: token.user.uId,
        username: token.user.username
      }
    }).then(user => {
      if (!user) {
        let data = {
          success: false,
          message: "권한이 없습니다. 로그인을 진행해 주세요."
        }
        res.status(400).json(data);
      } else {
        let data = {
          success: true,
          message: "회원정보 로드에 성공하였습니다.",
          data: user
        }
        res.status(200).json(data);
      }
    }).catch(err => {
      console.log('회원정보 프로세스 오류 : ' + err);
    })
  }
});

module.exports = router;