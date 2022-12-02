# 反混淆
## sojson6

### 特征
```js
;var encode_version = 'jsjiami.com.v6'
```
### 方案
[Jsjiemi](https://github.com/NXY666/Jsjiemi.git)

## sojson5

### 特征
```js
// gjwj666/qx
;var encode_version = 'jsjiami.com.v5'
```
### 方案
sojson5.html

## sojson4

### 特征
```js
;var encode_version = 'jsjiami.com.v4'
```

### 方案
sojson4.html

## obfuscator

### 特征
```js
// 89996462/Quantumult-X
var __encode ='jsjiami.com',_a={}, _0xb483=[]
```
### 特征2
```js
// gjwj666/qx
var _0x1f35=['\x66\x4d\x4f\x33\x77\x36\x4d\']
```
### 方案
[obfuscator](https://www.dejs.vip/encry_decry/obfuscator.html)
[jiemi](https://www.jsjiami.com/jiemi.html)


## eval

### 特征
```js
;eval(function(p,a,c,k,e,r){e=xxx})
```

### 方案
只需要把 eval 改成 console.log ，然后在浏览器的控制台(Console标签)输出，即可还原出源代码