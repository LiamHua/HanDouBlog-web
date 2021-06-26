// 格式校验规则

// 昵称校验
export const nicknameRule = [
  { required: true, message: '请输入昵称', trigger: 'blur' },
  { min: 2, max: 10, message: '昵称为2-10个字符', trigger: 'blur' }
]

// 电话号码校验
export const telRule = [
  { required: true, message: '请输入手机号', trigger: 'blur' },
  { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
]

// 登陆与注册密码校验
export const passwordRule = [
  { required: true, message: '请输入密码', trigger: 'blur' },
  { min: 6, max: 15, message: '请输入正确的密码', trigger: 'blur' }
]

// 验证码校验
export const smsRule = [
  { required: true, message: '请输入验证码', trigger: 'blur' },
  { min: 6, max: 6, message: '请输入正确的验证码', trigger: 'blur' }
]