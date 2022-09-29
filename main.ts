input.onButtonPressed(Button.A, function () {
    if (Begun == true) {
        music.playSoundEffect(music.createSoundEffect(WaveShape.Sine, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.InBackground)
        while (led.pointBrightness(PosX, PosY - 1) <= 0 && PosY > 0) {
            led.plot(PosX, PosY - 1)
            basic.pause(100)
            led.unplot(PosX, PosY - 1)
            PosY += -1
        }
        if (led.pointBrightness(PosX, PosY - 1) != 0) {
            led.plotBrightness(PosX, PosY - 1, led.pointBrightness(PosX, PosY - 1) - 85)
        }
        PosY = 4
    }
})
input.onGesture(Gesture.TiltLeft, function () {
    if (Begun == true) {
        if (PosX != 0) {
            led.toggle(PosX, 4)
            PosX += -1
            led.toggle(PosX, 4)
        }
    }
})
input.onButtonPressed(Button.B, function () {
    if (Resetting == false) {
        Resetting = true
        led.stopAnimation()
        Begun = false
        basic.showString("RESETTING")
        PosY = 4
        PosX = 2
        music.playMelody("C5 A F D C D E F ", 120)
        basic.showLeds(`
            # # # # #
            # # # # #
            . . . . .
            . . . . .
            . . # . .
            `)
        Begun = true
        Resetting = false
    }
})
input.onGesture(Gesture.TiltRight, function () {
    if (Begun == true) {
        if (PosX != 4) {
            led.toggle(PosX, 4)
            PosX += 1
            led.toggle(PosX, 4)
        }
    }
})
let PosX = 0
let PosY = 0
let Begun = false
let Resetting = false
Resetting = false
Begun = false
basic.showString("BOOTING UP")
PosY = 4
PosX = 2
music.playMelody("C5 A F D C D E F ", 120)
basic.showLeds(`
    # # # # #
    # # # # #
    . . . . .
    . . . . .
    . . # . .
    `)
Begun = true
basic.forever(function () {
    if (Begun == true) {
        if (led.pointBrightness(0, 0) == 0 && (led.pointBrightness(1, 0) == 0 && (led.pointBrightness(2, 0) == 0 && (led.pointBrightness(3, 0) == 0 && led.pointBrightness(4, 0) == 0)))) {
            Begun = false
            basic.clearScreen()
            music.playMelody("C5 G B A F A C5 B ", 120)
            basic.showString("YOU WIN")
            while (Resetting == false) {
                basic.showString("PRESS B TO RESTART")
            }
        }
    }
})
