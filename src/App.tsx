// 成语闯关游戏主应用组件 - 临时测试版本
function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>🎮 成语闯关</h1>
        <p>测试页面 - React应用正常运行！</p>
        <p>时间: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}

export default App; 