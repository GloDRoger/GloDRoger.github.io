import 'package:http/http.dart';
import 'dart:convert';
import 'package:intl/intl.dart';

class WorldTime {

  String location; //地区
  late String time; //该地区的时间
  String flag; //国旗的url 
  String url; //地区后缀
  late bool isDaytime; //判断白天黑夜

  WorldTime({required this.location,required this.flag,required this.url});

  Future<void> getTime() async {

    //错误处理
    try {
      //发送请求
      Response response = await get(Uri.parse('http://worldtimeapi.org/api/timezone/$url'));
      Map timeData = jsonDecode(response.body);
      
      //整理需要的数据
      String dateTime = timeData['datetime'];
      String offset = timeData['utc_offset'].substring(0,3);

      //create DatetTime object
      DateTime now = DateTime.parse(dateTime);
      now = now.add(Duration(hours: int.parse(offset)));

      //设置时间
      isDaytime = now.hour > 6 && now.hour < 19 ? true : false ;
      time = DateFormat.jm().format(now);
      flag = 'images/$flag';

    } catch (e) {
      print('错误：$e');
      time = '获取时间数据失败！';
    }
  }

}

