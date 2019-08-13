//
//  ViewController.swift
//  Quizz
//
//  Created by fangn on 2019/3/1.
//  Copyright © 2019 Fang Nan. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    let questions = [
        Question(text: "太阳从东边升起？", correctAnswer: true),
        Question(text: "乔布斯是Apple的创始人？", correctAnswer: true),
        Question(text: "马云是中国首富吗？", correctAnswer: true),
        Question(text: "刘强东最早是在中关村卖光盘的吗？", correctAnswer: true),
        Question(text: "苹果公司是目前世界上最牛的科技公司吗？", correctAnswer: true),
        Question(text: "只要坚持下去就能学好代码吗？", correctAnswer: true),
        Question(text: "马云是腾讯的创始人吗？", correctAnswer: false),
        Question(text: "在国内可以正常访问google.com吗？", correctAnswer: false),
        Question(text: "敲完1万行代码之后可以成为编程高手吗？", correctAnswer: true),
        Question(text: "马化腾是马云的亲兄弟吗？", correctAnswer: false),
        Question(text: "刘强东的男的吗？", correctAnswer: true),
        Question(text: "网上说苹果不好用安卓好用的人大多数都是水军吗？", correctAnswer: true),
        Question(text: "豆瓣网是一个和你分享刚编的故事的网站吗？", correctAnswer: false),
        Question(text: "Google是一家伟大的公司吗？", correctAnswer: true),
        Question(text: "扎克伯格是Facebook的创始人吗？", correctAnswer: true)
    ]
    
    var questionNum: Int = 0
    var score: Int = 0
    
    @IBOutlet weak var questionLabel: UILabel!
    @IBOutlet weak var messageLabel: UILabel!
    @IBOutlet weak var progressLabel: UILabel!
    @IBOutlet weak var scoreLabel: UILabel!
    @IBOutlet weak var progressBar: UIView!
    
  

    @IBAction func answerButton(_ sender: UIButton) {

        //检查当前回答的正确性
        checkAnswer(tag: sender.tag)
        //更新下一个问题
        nextQuestion()
    }
    
    //更新下一个问题
    func nextQuestion(){
        questionNum += 1
        if questionNum < 15{
            updateUI()
        }
        else{
            progressLabel.text = "完成进度：\(questionNum)/15"
            scoreLabel.text = "总得分：\(score)"
            
            let alert = UIAlertController(title: "漂亮！", message: "你已经完成了所有问题，是否重新一遍呢？", preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "再来一遍", style: .default, handler: { (_) in
                self.questionNum = 0
                self.score = 0
                self.updateUI()
            }))
            self.present(alert, animated: true, completion: nil)
        }
    }
    
    //检查当前回答的正确性
    func checkAnswer(tag: Int){
        if tag == 0{         //选择button是
            if questions[questionNum].answer == true{
                messageLabel.text = "答案正确"
                ProgressHUD.showSuccess("答对了！")
                score += 1
            }
            else{
                messageLabel.text = "答案错误"
                ProgressHUD.showError("答错了！")
            }
        }
        else{                       //选择button否
            if questions[questionNum].answer == false{
                messageLabel.text = "答案正确"
                ProgressHUD.showSuccess("答对了！")
                score += 1
            }
            else{
                messageLabel.text = "答案错误"
                ProgressHUD.showError("答错了！")
            }
        }
    }
    
    //现实内容刷新
    func updateUI(){
        questionLabel.text = questions[questionNum].questionText
        progressLabel.text = "完成进度：\(questionNum)/15"
        scoreLabel.text = "总得分：\(score)"
        progressBar.frame.size.width = CGFloat(questionNum + 1) * view.frame.width / 15.0
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        questionLabel.text = questions[questionNum].questionText
    }


}

