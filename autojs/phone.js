if (!requestScreenCapture(false)) {
            toast("请求截图权限失败");
            exit();
        }
        start()
        function start() {
            // 红包未开颜色
            var color = '#fffa9d3b'
            while (true) {
                // 截取图片 captureScreen()
                var img = captureScreen();
                sleep(200)
                // exit()
                var point = findColor(img, color, {
                    region: [152, 0, 20, device.height],
                    threshold: 4
                })
                if (point) {
                    var x = point.x
                    var y = point.y
                    click(x, y)
                    rob()
                } else {
                    console.log('未找到');
                }
            }
        
        }
        
        // 开红包
        function rob() {
            sleep(200)
            var open = desc('开').find()
            console.log(open.length, '点击开启')
            if (open.length > 0) {
                open[0].click()
                sleep(1000)
                back()
            }
        }
        
        // 返回
        function back() {
            sleep(500)
            click(36, 94)
        }