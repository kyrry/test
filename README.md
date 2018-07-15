# 项目说明

## 本地环境安装

```
# 安装 NodeJS NPM
$ sudo apt-get install node npm -g

# 更新 NodeJS (Linux, OSX)
$ npm install -g n
$ n 6.2.2

# 更新 NPM
$ npm install -g npm

# 更新 NodeJS 6.2.2 或以上稳定版本
$ npm install -g n nrm
$ n use stable

# 使用淘宝源 或 cnpm 源
$ nrm use taobao
$ 或
$ npm install -g cnpm --registry=https://registry.npm.taobao.org

# (npm、cnpm)安装 node_modules
$ cd /path/to/project
$ npm install 或 cnpm install

# yarn 方式安装node_modules
$ 1、npm install yarn -g 或者 cnpm install yarn -g
$ 2、yarn

# yarn安装依赖包
$ yarn add xxx --dev

$  设置从缓存安装 yarn config set yarn-offline-mirror ./npm-packages-offline-cache
```

#### Nginx 配置文件导入

```
# 生成 nginx 配置文件
$ ./bin/nginx
# 或者
$ npm run nginx

# 导入配置文件
$ echo "include /path/to/project/vhosts/nginx.conf;" >> /path/to/nginx/nginx.conf

# 重启nginx
# Linux
$ sudo service nginx restart
# OSX
$ sudo brew services restart nginx
# windos
$ nginx -s reload
```

## 代码编译与发布

```
# 开发环境编译
$ npm start

# 发布代码
$ npm run build
```

## 需要本地调试微信相关问题

```
# 1、自行安装nginx
# 2、到项目根目录运行下面命令
$ npm run nginx

# 3、到启动nginx服务
# 4、使用m.kamengjinfu.com进行访问
```

```
## 删除强制跳转https
$ chrome://net-internals/#hsts
$ 在delete 里面填入域名，删除
```