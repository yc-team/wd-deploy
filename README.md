wd-deploy
===========

命令行工具，来自动执行git操作：

```javascript
remote			远程的git库，一般就是wandoulabs上的
silent    		Do not echo program output to console
branch			分支支持，默认是master
```

## how to install

```javascript
sudo npm install wd-deploy -g
```

## how to use

```javascript
wd -h
```

## clone a repo

> clone url is required

```javascript
wd -c git@github.com:components/zepto.git
```


## commit myself

```javascript
wd -m "i do not like auto commit msg"
```

## all auto by God

> so easy

```wd
wd
```

#### 注释：

* 默认执行路径选择 - 是用户当前执行目录下
