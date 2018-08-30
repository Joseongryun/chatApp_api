const express = require('express');
const router = express.Router();
const models = require('../models');
const Op = models.Sequelize.Op;

router.post("/message", (req, res) => {
  var token = req.token;
  if (typeof token == undefined || token == "" || token == null) {
    let data = {
      success: false,
      message: "권한이 없습니다. 로그인을 진행해 주세요."
    }
    res.status(400).json(data);
    return;
  } else {
    var s_uid = req.body.suid;
    var r_uid = req.body.ruid;
    var content = req.body.content;
    models.db.Messages.create({
      sUid: s_uid,
      rUid: r_uid,
      content: content
    }).then(result => {
      let data = {
        success: true,
        message: '메세지 전송에 성공하였습니다.'
      }
      res.status(200).json(data);
    }).catch(err => {
      let data = {
        success: false,
        message: '메세지 전송에 실패하였습니다.'
      }
      console.log("메세지 전송 에러 : " + err);
    });
  }
});

router.get("/message/:r_uid", (req, res) => {
  var token = req.token;
  if (typeof token == undefined || token == "" || token == null) {
    let data = {
      success: false,
      message: "권한이 없습니다. 로그인을 진행해 주세요."
    }
    res.status(400).json(data);
    return;
  }
  var r_uid = req.params.r_uid;
  var s_uid = token.user.uId;

  console.log(r_uid, s_uid);

  let condition = {
    where: {
      [Op.or]: [{
          r_uid: r_uid,
          s_uid: s_uid
        },
        {
          r_uid: s_uid,
          s_uid: r_uid
        }
      ]
    }
  }
  models.db.Messages.findAll(condition).then(messages => {
    if (messages !== null) {
      let data = {
        success: true,
        message: "정상적으로 메세지를 가져왔습니다.",
        data: messages
      }
      res.status(200).json(data);
    } else {
      let data = {
        success: false,
        message: "메세지를 가져오는 중에 오류가 발생했습니다.",
      }
      res.status(400).json(data);
    }
  }).catch(err => {
    console.log("메세지 프로세스 오류 : " + err);
    let data = {
      success: false,
      message: "메세지를 가져오는 중에 오류가 발생했습니다.",
    }
    res.status(400).json(data);
  })
})

router.get("/message", (req, res) => {
  var token = req.token;
  if (typeof token == undefined || token == "" || token == null) {
    let data = {
      success: false,
      message: "권한이 없습니다. 로그인을 진행해 주세요."
    }
    res.status(400).json(data);
    return;
  } else {
    var r_uid = token.user.uId;
    models.sequelize.query('SELECT `uid`, `username` FROM `users` JOIN (SELECT `s_uid` FROM `messages` WHERE `r_uid` = ? UNION SELECT `r_uid` FROM `messages` WHERE `s_uid` = ?) AS `message` on `message`.`s_uid` = `users`.`uid`', {
      replacements: [r_uid, r_uid],
      type: models.Sequelize.QueryTypes.SELECT
    }).then(messageGroup => {
      let data = {
        success: true,
        message: "방목록을 정상적으로 불러왔습니다.",
        data: messageGroup
      }
      res.status(200).json(data);
    }).catch(err => {
      console.log("방목록 불러오기 프로세스 에러 : " + err);
      let data = {
        success: false,
        message: "방목록을 불러오는데 실패하였습니다."
      }
      res.status(400).json(data);
    })
  }
})

module.exports = router;