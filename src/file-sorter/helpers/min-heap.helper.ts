import { HeapNode } from '../interfaces/heap-node.interface';

export class MinHeap {
  private heap: HeapNode[] = [];

  push(node: HeapNode) {
    this.heap.push(node);
    this.heapifyUp(this.heap.length - 1);
  }

  pop(): HeapNode | null {
    if (this.isEmpty()) return null;

    const root = this.heap[0];
    const lastNode = this.heap.pop();

    if (this.heap.length > 0 && lastNode) {
      this.heap[0] = lastNode;
      this.heapifyDown(0);
    }

    return root;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private heapifyUp(index: number) {
    const parentIndex = Math.floor((index - 1) / 2);
    if (parentIndex >= 0 && this.heap[index].value < this.heap[parentIndex].value) {
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      this.heapifyUp(parentIndex);
    }
  }

  private heapifyDown(index: number) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallest = index;

    if (leftChildIndex < this.heap.length && this.heap[leftChildIndex].value < this.heap[smallest].value) {
      smallest = leftChildIndex;
    }

    if (rightChildIndex < this.heap.length && this.heap[rightChildIndex].value < this.heap[smallest].value) {
      smallest = rightChildIndex;
    }

    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      this.heapifyDown(smallest);
    }
  }
}
