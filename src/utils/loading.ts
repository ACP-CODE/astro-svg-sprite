function showLoading() {
  const frames = ['-', '\\', '|', '/']; // 加载动画的帧列表
  let frameIndex = 0; // 当前帧的索引

  const loadingInterval = setInterval(() => {
    process.stdout.write(`\r${frames[frameIndex]}`); // 输出当前帧
    frameIndex = (frameIndex + 1) % frames.length; // 更新帧索引
  }, 100);

  // 返回一个函数，用于停止加载效果
  return () => {
    clearInterval(loadingInterval); // 清除加载定时器
    process.stdout.write('\r'); // 清除当前行
  };
}

// 使用示例
const stopLoading = showLoading();

// 模拟加载过程
setTimeout(() => {
  stopLoading(); // 停止加载效果
  console.log('Loading completed!'); // 输出加载完成的消息
}, 5000);