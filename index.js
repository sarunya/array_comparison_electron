const {
    app,
    BrowserWindow,
    Menu,
    MenuItem
} = require('electron');

const url = require('url');
const path = require('path');

let win;

const template = [{
        label: 'Edit',
        submenu: [{
                role: 'undo'
            },
            {
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                role: 'cut'
            },
            {
                role: 'copy'
            },
            {
                role: 'paste'
            }
        ]
    },

    {
        label: 'View',
        submenu: [{
                role: 'reload'
            },
            {
                role: 'toggledevtools'
            },
            {
                type: 'separator'
            },
            {
                role: 'resetzoom'
            },
            {
                role: 'zoomin'
            },
            {
                role: 'zoomout'
            },
            {
                type: 'separator'
            },
            {
                role: 'togglefullscreen'
            }
        ]
    },

    {
        role: 'window',
        submenu: [{
                role: 'minimize'
            },{
                role: 'maximize'
            },
            {
                role: 'close'
            }
        ]
    },

    {
        role: 'help',
        submenu: [{
            label: 'Learn More'
        }]
    }
]

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

app.on('ready', createWindow);