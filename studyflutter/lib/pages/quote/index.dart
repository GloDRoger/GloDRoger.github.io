import 'package:flutter/material.dart';
import 'quotecard.dart';

class QuoteList extends StatefulWidget {
  QuoteList({Key? key}) : super(key: key);

  @override
  State<QuoteList> createState() => _QuoteListState();
}

class _QuoteListState extends State<QuoteList> {

  List<Quote> quotes = [
    Quote(author: '李白',text: '轻舟已过万重山'),
    Quote(author: '杜甫',text: '两个黄鹂鸣翠柳'),
    Quote(author: '白居易',text: '一行白鹭上青天'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      appBar: AppBar(
        title: Text('Awesome Quotes'),
        centerTitle: true,
        backgroundColor: Colors.redAccent,
      ),
      body: Column(
        children:quotes.map((quote) => QuoteCard(quote:quote,delete:(){
          setState(() {
            quotes.remove(quote);
          });
        })).toList(),
      ),
    );
  }
}

