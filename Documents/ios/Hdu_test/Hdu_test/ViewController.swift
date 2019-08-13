//
//  ViewController.swift
//  Hdu_test
//
//  Created by fangn on 2019/3/5.
//  Copyright © 2019 Fang Nan. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func motionEnded(_ motion: UIEvent.EventSubtype, with event: UIEvent?) {
        showMessage()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    func showMessage(){
        let alert = UIAlertController(title: "请确认下列问题", message: "张博阳是小鸡吧？", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "确认", style: .default, handler: { (_) in
        }))
        self.present(alert, animated: true, completion: nil)
        //ProgressHUD.showSuccess("回答正确")
    }

}

