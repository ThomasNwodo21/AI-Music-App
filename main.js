song = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;

leftWristX = 0;
leftWristY = 0;

rigthWristX = 0;
rigthWristY = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
    canvas= createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");
   if(scoreRightWrist > 0.2)
   {
    circle(rightWristX,rigthWristY,20);

    if(rigthWristY >0 && rigthWristY <= 100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x",
        song.rate(0.5);
    }
    else if(rigthWristY >100 && rigthWristY <= 200)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x",
        song.rate(1);
    }
    else if(rigthWristY >200 && rigthWristY <= 300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x",
        song.rate(1.5);
    }
    else if(rigthWristY >300 && rigthWristY <= 400)
    {
        document.getElementById("speed").innerHTML = "Speed = 2x",
        song.rate(2);
    }
    else if(rigthWristY >400 && rigthWristY <= 500)
    {
        document.getElementById("speed").innerHTML = "Speed = 2.5x",
        song.rate(2.5);
    }
   }
if(scoreLeftWrist > 0.2)
{
    circle(leftWristX,leftWristY,20);
    inNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(inNumberleftWristY);
    leftWristY_divide_1000 = remove_decimals/1000; 
    volume = leftWristY_divide_1000 *2 ;
    document.getElementById("volume").innerHTML = "Volume =" + volume;
    song.setVolume(volume);
}
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded()
{
    console.log('poseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0);
    {
        console.log(results);
        scoreRightWrist =  results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist =" + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rigthWristX +" rightWristY = "+ rightWristY);
    }
}