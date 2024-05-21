let ROBOT = "";
let OttoConnected = false;

function OttoConnection(robot) {
    if (robot != ROBOT && ROBOT != '') {
        Swal.fire({
            icon: 'info',
            title: '在连接 '+robot + '之前' + '请断开 '+ROBOT+' 连接',
            text: '点击已连接机器人图标断开蓝牙连接'
        })
    } else {
        ROBOT = robot;
        if(isConnected) {
            Swal.fire({
                icon: 'question',
                title: '是否断开机器人 '+robot+' 连接?',
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: '确认',
                cancelButtonText: `取消`,
                }).then((result) => {
                if (result.isConfirmed) {
                    onDisconnected()
                    SetRobot()
                    document.getElementsByClassName('container__bluetooth--icon')[0].style.display = "none";
                    document.getElementsByClassName('container__bluetooth--icon')[0].style.backgroundColor = "#FF5700";
                    Swal.fire('机器人 '+robot+' 已断开连接!', '', 'info')
                } 
            })
        } else {
            Swal.fire({
                title: '连接 '+robot+'?',
                icon: 'question',
                html:
                    '如果你有一个 <a href="https://www.ottodiy.com/" target="_blank">Otto DIY</a> 机器人， 在使用此应用连接之前:<br> ' +
                    '1. 机器人需要配置蓝牙模块 <br>' +
                    '2. 烧录相应的程序.<ul><li>OttoStarter(Otto基础款) <a href="OttoS_BLE.ino" target="_blank">Arduino 代码</a> 或者 <a href="https://ivanr3d.com/tools/otto/codes/" target="_blank">在线上传</a></li> <li>OttoWheels(Otto双轮机器人) <a href="OttoW_BLE.ino" target="_blank">Arduino 代码</a> 或者 <a href="https://ivanr3d.com/tools/otto/codes/" target="_blank">在线上传</a></li>',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: '连接',
                denyButtonText: `取消`,
                }).then((result) => {
                if (result.isConfirmed) {
                    OttoConnected = true
                    connectToBle()
                } else {
                    ROBOT = "";
                    Swal.fire('未连接机器人!', '', 'info')
                } 
            })
        }
    }
    
}

function SetRobot() {
    document.getElementById("disconnectMessage--container").style.display == "none" ? document.getElementById("disconnectMessage--container").style.display = "flex" : document.getElementById("disconnectMessage--container").style.display = "none";

    document.getElementsByClassName("lever")[0].style.display == "none" ? document.getElementsByClassName("lever")[0].style.display = "flex" : document.getElementsByClassName("lever")[0].style.display = "none";

    document.getElementById("functions--section").style.display == "none" ? document.getElementById("functions--section").style.display = "flex" : document.getElementById("functions--section").style.display = "none";

    if (ROBOT == 'Otto Starter') {
        document.getElementById("OttoStarter").classList.toggle('green--mask');
        if (isConnected) {
            document.getElementById("dir--keys").style.display == "none" ? document.getElementById("dir--keys").style.display = "flex" : document.getElementById("dir--keys").style.display = "none";
            CreateGesturesButtons();
            CreateUltrasound();
            CreateAvoidance();
            CreateForce();
        } else {
            ROBOT = "";
            document.getElementById("dir--keys").style.display == "flex" ? document.getElementById("dir--keys").style.display = "none" : null;
            FunctionsDestroyer();
        }
    }
    else if (ROBOT == 'Otto Wheels') {
        document.getElementById("OttoWheels").classList.toggle('green--mask');
        if (isConnected) {
            document.getElementById("joystick--control").style.display == "none" ? document.getElementById("joystick--control").style.display = "flex" : document.getElementById("joystick--control").style.display = "none";
            document.getElementsByClassName("slider--container")[0].style.display = "none";
            CreateUltrasound();
            CreateInfrared();
            CreateAvoidance();
            CreateLineFollower();
        } else {
            ROBOT = "";
            document.getElementById("joystick--control").style.display == "flex" ? document.getElementById("joystick--control").style.display = "none" : null;
            FunctionsDestroyer();
        }
    }
}
