//
//  ViewController.swift
//  magic
//
//  Created by fangn on 2019/2/27.
//  Copyright © 2019 Fang Nan. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    
    @IBOutlet weak var magicImageView: UIImageView!
    
    @IBAction func askButton(_ sender: Any) {
        updateMagicImage()
    }
    
    var magicArray: [String] = ["ball1", "ball2", "ball3", "ball4", "ball5"]
    
    override func motionEnded(_ motion: UIEvent.EventSubtype, with event: UIEvent?) {
        updateMagicImage()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        updateMagicImage()
    }

    func updateMagicImage(){
        var index = Int.random(in: 0...4)
        magicImageView.image = UIImage(named: magicArray[index])
    }

}

