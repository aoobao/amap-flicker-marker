// 模拟后台输出格式

export default {
  success(data, msg) {
    const res = {};
    res.data = data || null;
    res.msg = msg || '成功';
    res.code = 0;
    res.isok = true;
    res.serveTime = new Date();
    return res;
  },
  error(msg, code, data) {
    const res = {};
    res.msg = msg || '错误';
    res.code = code || -1;
    res.data = data || null;
    res.isok = false;
    res.serveTime = new Date();
    return res;
  },
};
