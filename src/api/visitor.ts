import AV from 'leancloud-storage';

// 初始化 LeanCloud
AV.init({
  appId: "你的AppID",
  appKey: "你的AppKey",
  serverURL: "你的服务器地址"
});

// 访问量统计类
export class VisitorCounter {
  private static counterObject: AV.Object;

  // 初始化计数器
  static async initCounter() {
    const Counter = AV.Object.extend('Visitor');
    const query = new AV.Query('Visitor');
    
    try {
      // 查找已存在的计数器
      const counter = await query.first();
      if (counter) {
        this.counterObject = counter;
      } else {
        // 创建新的计数器
        const newCounter = new Counter();
        newCounter.set('count', 0);
        this.counterObject = await newCounter.save();
      }
    } catch (error) {
      console.error('初始化访问计数器失败:', error);
    }
  }

  // 增加访问量
  static async incrementVisitor() {
    if (!this.counterObject) {
      await this.initCounter();
    }
    
    try {
      this.counterObject.increment('count');
      await this.counterObject.save();
      return this.counterObject.get('count');
    } catch (error) {
      console.error('增加访问量失败:', error);
      return null;
    }
  }

  // 获取当前访问量
  static async getVisitorCount() {
    if (!this.counterObject) {
      await this.initCounter();
    }
    return this.counterObject.get('count');
  }
} 