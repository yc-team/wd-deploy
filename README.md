wd-deploy
===========

node 版本的命令行工具，来自动执行 git 操作：


## depend

install node in <a target="_blank" href="http://nodejs.org/">官网</a>

## how to install

should be install -g

```javascript
sudo npm install wd-deploy -g
```

## how to get help

```javascript
wd -h
```

## clone a repo

> clone url is required

```javascript
wd -c git@github.com:components/zepto.git
```

多次执行是无效的，自动判断了



## commit by myself

```javascript
wd -m "i do not like auto commit msg"
```


## all auto by God

> so easy

```wd
wd
```

多次执行是无效的，自动判断了


## support branch

> default branch is master

```javascript
wd -b test_branch
```

#### 注释：

* 默认执行路径选择 - 是用户当前执行目录下
