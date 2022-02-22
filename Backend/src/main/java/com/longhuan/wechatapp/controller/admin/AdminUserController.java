package com.longhuan.wechatapp.controller.admin;

import com.alibaba.fastjson.JSONObject;
import com.longhuan.wechatapp.entity.Lesson;
import com.longhuan.wechatapp.entity.User;
import com.longhuan.wechatapp.entity.UserJoinLesson;
import com.longhuan.wechatapp.result.AdminResult;
import com.longhuan.wechatapp.service.LessonService;
import com.longhuan.wechatapp.service.UserJoinLessonService;
import com.longhuan.wechatapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(path = "/admin")
public class AdminUserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserJoinLessonService userJoinLessonService;

    @RequestMapping("/getUserAll")
    public AdminResult adminLessons() {
        List<User> users = userService.list();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("users", users);
        AdminResult adminResult = new AdminResult(jsonObject);
        adminResult.setCode(20000);
        return adminResult;
    }

    @RequestMapping(path = "/saveOrUpdateUser", method = RequestMethod.POST, consumes = "application/json")
    public AdminResult addLesson(@RequestBody User user) {
        userService.saveOrUpdate(user);
        AdminResult adminResult = new AdminResult(20000, "数据修改成功！");
        return adminResult;
    }

    @RequestMapping(path = "/deleteUser")
    public AdminResult deleteUser(@RequestParam String openid) {
        User user = new User();
        user.setOpenid(openid);
        boolean res = userService.removeById(user);
        System.out.println("res = " + res);
        AdminResult adminResult = new AdminResult(20000, "数据删除成功！");
        return adminResult;
    }

    @RequestMapping(path = "/queryLessonForUser")
    public AdminResult queryLessonForUser(@RequestParam String openid) {
        User user = new User();
        user.setOpenid(openid);
        List<Lesson> lessons = userJoinLessonService.getLessonsForUser(user);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("lessons", lessons);
        AdminResult adminResult = new AdminResult(jsonObject, "数据查询成功！");
        return adminResult;
    }

}
