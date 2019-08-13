import kenlm
import time 
from itertools import permutations

#主函数
if __name__ == "__main__":
    start = time.process_time()

    #使用15%的1 Billion Words数据训练的 5-Gram 语料模型
    model = kenlm.LanguageModel('./0_15b_5.bin')

    #微信小程序客户端中，用户在输入界面，用换行符表示待输入空格
    #在小程序客户端的后台，先将换行符，转化为"%s"
    #然后再发送给服务器，运行句子预测算法，得到的示例句子如下 template_str 所示：
    template_str = "The ban %s %s %s and the %s %s %s was now no %s to %s on it"
    #句子的候选填空项以如下列表的方式进行存储，此为示例：
    choices = ["last","month","said","expired","court","rule","need","there"]

    #对候选项进行排列方式枚举
    new_lines = []
    all_iters = list(permutations(choices,len(choices)))   
    for word_iter in all_iters:
        new_lines += [template_str % word_iter]

    #使用语言模型进行打分，最优组合为得分最大的句子
    max_score = -1000       
    max_score_line = ""
    for new_line in new_lines:
        if model.score(new_line) > max_score:
            max_score = model.score(new_line)
            max_score_line = new_line
    print(max_score , '\t' + max_score_line)

    end = time.process_time()
    print(end-start)

