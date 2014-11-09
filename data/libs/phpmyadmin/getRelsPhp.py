import os
# Need to have latest release downloaded in current directory...
# and tags in ptags.txt in current directory

# phpmyadmin
with open ("ptags.txt") as tag:
    content = tag.readlines()

for line in content:
    line=line.rstrip()
    os.chdir(lib)
    cmd="git checkout "+line
    os.system(cmd)
    os.chdir("../")
    # Need to replace approriate characters to have release folder look like "2_3_0"
    cmd="cp -r "+lib+" "+ line.replace("R_","").replace(".","_")
    os.system(cmd)
    direc = line.replace("R_","").replace(".","_")
    os.chdir(direc)
    os.system("rm -rf .git")
    os.chdir("../")

