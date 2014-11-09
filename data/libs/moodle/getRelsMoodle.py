import os
# Need to have latest release downloaded in current directory...

# moodle
with open ("mtags.txt") as tag:
    content = tag.readlines()

for line in content:
    line=line.rstrip()
    os.chdir(lib)
    cmd="git checkout "+line
    os.system(cmd)
    os.chdir("../")
    # Need to replace approriate characters to have release folder look like "2_3_0"
    cmd="cp -r "+lib+" "+ line.replace("v","").replace(".","_")
    os.system(cmd)
    direc = line.replace("v","").replace(".","_")
    os.chdir(direc)
    os.system("rm -rf .git")
    os.chdir("../")