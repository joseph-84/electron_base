// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
  // 윈도우 브라우저 생성
  // 아래 윈도우 사이즈 최대화를 시킨 이후 화면에 띄우기 때문에 width, height은 불필요합니다.
  // 추후 사이즈 최대화가 아닌 고정값이 필요한 경우를 대비해 삭제하지 않았습니다.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // front에서 require 사용을 위한 구문
      // 이거 사용 시 jquery 쓰려면 최초 호출되는 js 최상단에
      // window.$ = window.jQuery = require('jquery');
      nodeIntegration: true,
      // Remote 모듈 써서 ChildWindow와 통신할 수 있게 하려면 사용
      enableRemoteModule: true
    },
    show: false
  })

  //윈도우 사이즈 최대화
  mainWindow.maximize();

  //메뉴 삭제
  mainWindow.removeMenu();

  //윈도우 띄우기
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // 최초 index.html 파일을 로드합니다.
  // 최초 로드파일을 변경하고자 하는 경우 여기서 변경 가능합니다.
  mainWindow.loadFile('index.html')

  // 어플리케이션 실행 시 개발자도구를 실행시킵니다.
  // 배포시에는 반드시 주석처리 후 배포하시기 바랍니다.
  // mainWindow.webContents.openDevTools()
}

// 일렉트론 초기화 완료 후 실행됩니다.
// 여기에서 초기 설정을 할 수도 있습니다.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
