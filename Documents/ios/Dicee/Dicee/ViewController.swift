//
//  ViewController.swift
//  Dicee
//
//  Created by fangn on 2019/2/27.
//  Copyright © 2019 Fang Nan. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var diceeImageView1: UIImageView!
    @IBOutlet weak var diceeImageView2: UIImageView!
    
    var index1: Int = 0;
    var index2: Int = 0;
    
    let diceeArray: [String] = ["dice1", "dice2", "dice3", "dice4", "dice5", "dice6"];
    
    @IBAction func rollButton(_ sender: Any) {
        updateDiceeImage()
    }
    
    override func motionEnded(_ motion: UIEvent.EventSubtype, with event: UIEvent?) {
        updateDiceeImage()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        updateDiceeImage()
    }
    
    
    func updateDiceeImage(){
        index1 = Int.random(in: 0...5);
        index2 = Int.random(in: 0...5);
        
        diceeImageView1.image = UIImage(named: diceeArray[index1])
        diceeImageView2.image = UIImage(named: diceeArray[index2])
    }


}

