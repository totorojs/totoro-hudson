# hudson 接入文档

## 项目创建

### 关键配置项
* name 项目名称
* description 项目描述
* logRotator? 构建日志保存规则
* jdk? jdk 版本
* label? 机器分配规则
* scm 版本控制信息. type(url) | git('git@gitlab.******.com/test.git')
* triggers? 触发规则 cron("35 23 * * *")
* steps 脚本执行 shell('weblint totoro')
* 邮件发布信息. emails

### 注意
目前基本信息就需要这些, 其中 ? 表示可以不提供, 系统提供默认的选项.
还有一个就是邮件发布目前依赖 weblint totoro 的输出, 如果使用其他命令的话, 邮件发布信息需要再扩展几个参数.




### 接入规则
用户提供一个 json 文件, 这个文件包含了项目信息, 具体类似

```
[{
  "name": "arale-base",
  "description": "项目描述",
  "scm": "git(****)",
  "emails": "leoner@163.com"
}, {
  "name": "arale-base",
  "description": "项目描述",
  "scm": "svn(****)",
  "emails": "leoner@163.com"
}]
```

