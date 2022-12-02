#!/usr/bin/python
# -*- coding: UTF-8 -*-
import re
import sys
import requests
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

DEJS = 0

def eval_arr(replace_arr, context):
    arr_str = re.search(r"var %s =(.*;)"%(replace_arr), context).group(1).strip(";")
    arr = eval(arr_str)
    for i in range(0, len(arr)):
        item = arr[i]
        # new_item = item.replace("\"", "\\\"")
        arr[i] = '"%s"' % item
    return arr


def eval_dejs_arr(replace_arr, context):
    arr_str = re.search(r"var %s =([\s\S]*\n]);" %
                        (replace_arr), context).group(1)
    # print(arr_str)
    arr = eval(arr_str)
    for i in range(0, len(arr)):
        item = arr[i]
        new_item = item.replace("\"", "\\\"")
        arr[i] = '"%s"' % new_item
    return arr


def str_arr(replace_arr, context):
    arr_str = re.search(r"var %s =(.*;)" % (replace_arr),
                        context).group(1).strip().strip(";").strip("[").strip("]")
    arr = arr_str.split(",")
    for i in range(0, len(arr)):
        item = arr[i].strip()
        new_item = item[0] + item[1:-1].replace("\"", "\\\"") + item[-1:]
        arr[i] = new_item
    return arr


def deal(file, context, t):
    # print(context)
    replace_arr = re.search(r"var (__Ox\w*)", context).group(1)
    print("replace_arr", replace_arr)
    arr = eval_dejs_arr(replace_arr, context)
    print(arr)

    for i  in range(0, len(arr)):
        v = i if t == DEJS else hex(i)
        idx_re = r"%s[%s]" % (replace_arr, v)
        # print(re.search(idx_re, context).group())
        # print(idx_re, arr[i])
        context = context.replace(idx_re, "%s" % arr[i])
    # print(context)

    with open("%s" % file, "w") as f:
        f.write(context)


def dejs(file, context):
    headers = {'content-type': 'application/x-www-form-urlencoded'}
    r = requests.post("https://www.dejs.vip/de_obfuscator", data={"data": context}, verify=False, headers=headers)
    deal(file, r.text, DEJS)


if __name__ == '__main__':

    filename = sys.argv[1]
    file = "surge/Script/%s.js" % (filename)

    with open(file, "r") as f:
        context = f.read()
        dejs(file, context)

