import 'package:flutter/material.dart';

class QuoteCard extends StatelessWidget {
  //StatelessWidget中不能使用数据，因为它是不能动态改变的组件，如果要使用数据，需要使用final关键字，表示值不会被改变
  final Quote quote;
  final Function delete;
  //这里同样使用的是命名式参数，只有一个参数，用位置参数也可以
  //delete方法因为声明了类型是Function，所以不能为空，所以这里需要使用required关键字
  QuoteCard({required this.quote,required this.delete});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.fromLTRB(16.0, 16.0, 16.0, 0),
      child: Padding(
        padding: const EdgeInsets.all(15.0),
        child:
            Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
          Text(
            quote.text,
            style: TextStyle(
              fontSize: 18.0,
              color: Colors.grey[600],
            ),
          ),
          SizedBox(
            height: 6.0,
          ),
          Text(
            quote.author,
            textAlign: TextAlign.right,
            style: TextStyle(fontSize: 14.0, color: Colors.grey[800]),
          ),
          SizedBox(
            height: 8.0,
          ),
          TextButton.icon(
            onPressed:(){delete();},
            icon: Icon(Icons.delete),
            label: Text('delete quote')
          )
        ]),
      ),
    );
  }
}

class Quote {

  String text;
  String author;

  Quote({required this.text,required this.author});

}