//
//  Question.swift
//  Quizz
//
//  Created by fangn on 2019/3/1.
//  Copyright © 2019 Fang Nan. All rights reserved.
//

import Foundation

class Question{
    //属性
    let questionText: String
    let answer: Bool
    //事件
    init(text: String, correctAnswer: Bool){
        self.questionText = text
        self.answer = correctAnswer
    }
}
