# Psuedo Code

lstUnsorted = [100, 29, 11, 39, 67, 256, 289, 367,
               299, 2, 39, 28, 101, 100, 155, 222, 321, 15]
lstSorted = []
lstCstCount = []
inMax = lstUnsorted[0]
inMin = lstUnsorted[0]

for numX in lstUnsorted:
    if numX > inMax:
        inMax = numX
    if numX < inMin:
        inMin = numX

for i in range(inMin, inMax+1):
    lstCstCount.append(0)

for numX in lstUnsorted:
    lstCstCount[numX-inMin] += 1

for i in range(inMin, inMax+1):
    while lstCstCount[i-inMin] != 0:
        lstSorted.append(i)
        lstCstCount[i-inMin] -= 1
