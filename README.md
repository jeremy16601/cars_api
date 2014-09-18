# Qianduo api

### 1.商户注册
-  http://121.42.28.206:3000/api/register_Mer 
-  post方式
-  参数 nickname, password ,tel , alipay, imei 
- 成功：{"success": true}  
- 失败：{"success": false} 

### 2.用户注册
-  http://121.42.28.206:3000/api/register
-  post方式
-  参数 nickame, password ,tel , alipay ,imei
- 成功：{"success": true}  
- 失败：{"success": false} 

### 3.商户列表
- http://121.42.28.206:3000/api/userList_Mer
- 请求方式 get 

### 4.用户列表
- http://121.42.28.206:3000/api/userList
- 请求方式get

### 5.用户登陆
- http://121.42.28.206:3000/api/userLogin
- post方式
- 参数 nickname,password
- 成功：{"success": true}  
- 失败：{"success": false} 

### 6.商户登陆
- http://121.42.28.206:3000/api/merLogin
- post方式
- 参数 nickname,password
- 成功：{"success": true}  
- 失败：{"success": false} 

### 7.根据用户名得到用户详细信息
- http://121.42.28.206:3000/api/userFindByName?nickname=用户名
- get方式
- 参数nickname
- 成功返回用户详细信息
- 失败{"data":"暂无数据！"}

### 8.根据商户名得到商户详细信息
- http://121.42.28.206:3000/api/userFindByName_Mer?nickname=用户名
- get方式
- 参数nickname
- 成功返回用户详细信息
- 失败{"data":"暂无数据！"}

### 9.根据用户_id 修改用户信息
- http://121.42.28.206:3000/api/userEdit
- post方式
- 成功返回{"success": true}
- 失败{"success": false}

### 10.根据商户_id 修改商户信息
- http://121.42.28.206:3000/api/userEdit_Mer
- post方式
- 成功返回{"success": true}
- 失败{"success": false}
