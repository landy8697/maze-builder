'''
Maze Generator in python projects class
Author: Andy Li
Project Example:
https://landy8697.github.io/maze-builder/
'''

import random
def createMaze(r, c):
    
    r,c = r-r%2, c-c%2 # Make sure r and c are odd
    #generates an empty 2d maze of walls
    arr = [['#' for x in range(c+1)] for y in range(r+1)]
    
    #creates stack, starting point at 1,1
    stack = []
    stack.append([1,1])
    arr[1][1] = '.'
    #direction array
    dr = [1, 0, -1, 0]
    dc = [0, 1, 0, -1]
    #loops while there are empty positions
    while len(stack)!=0:
        cur = stack.pop() #current position
        r0, c0 = cur[0], cur[1]

        viscnt = 0
        vis = [0, 0, 0, 0]
        while viscnt < 4: #generates random directions
            dir = random.randint(0, 3)
            if vis[dir]==1:
                continue
            vis[dir] = 1
            viscnt += 1

            #moves in the direction
            r1, c1 = r0+dr[dir]*2, c0+dc[dir]*2
            #checks if the position is out of bounds
            if not(r1>=1 and r1<=r and c1>=1 and c1<=c):
                continue
            #if the new position is empty, 
            if arr[r1][c1]!='#':
                continue
            canPlace = True
            #Checks if the new position is valid to go to
            for i in range(4):
                r2, c2 = r1+dr[i], c1+dc[i]
                if not(r2>=1 and r2<=r and c2>=1 and c2<=c):
                    continue
                if (r2==r0 and c2==c0):
                    continue
                if arr[r2][c2]!='#':
                    canPlace = False
            if not canPlace:
                continue
            #Places the empty positions
            arr[r1][c1] = '.'
            arr[r1-dr[dir]][c1-dc[dir]] = '.'

            if viscnt < 4:
                stack.append([r0, c0])
            stack.append([r1, c1])
            break
    arr[1][0] = '.'
    return arr

#Prints the maze (removes the commas)
def printMaze(maze):
    for row in maze:
        print(*row)

#USER INPUT
rows = int(input("Enter number of rows: "))
cols = int(input("Enter number of columns: "))
maze = createMaze(rows, cols)
printMaze(maze)