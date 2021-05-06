package paasio

import (
	"io"
	"sync"
)

type (
	SimpleReadCounter struct {
		r     io.Reader
		mutex sync.RWMutex
		total int64
		nops  int
	}

	SimpleWriteCounter struct {
		w     io.Writer
		mutex sync.RWMutex
		total int64
		nops  int
	}

	SimpleReadWriteCounter struct {
		*SimpleReadCounter
		*SimpleWriteCounter
	}
)

func NewReadCounter(r io.Reader) ReadCounter {
	return &SimpleReadCounter{r: r}
}

func NewWriteCounter(w io.Writer) WriteCounter {
	return &SimpleWriteCounter{w: w}
}

func NewReadWriteCounter(rw io.ReadWriter) ReadWriteCounter {
	return &SimpleReadWriteCounter{
		SimpleReadCounter:  &SimpleReadCounter{r: rw},
		SimpleWriteCounter: &SimpleWriteCounter{w: rw},
	}
}

func (r *SimpleReadCounter) Read(p []byte) (n int, err error) {
	n, err = r.r.Read(p)

	r.mutex.Lock()
	defer r.mutex.Unlock()

	r.total += int64(n)
	r.nops++

	return n, err
}

func (r *SimpleReadCounter) ReadCount() (n int64, nops int) {
	r.mutex.RLock()
	defer r.mutex.RUnlock()

	return r.total, r.nops
}

func (w *SimpleWriteCounter) Write(p []byte) (n int, err error) {
	n, err = w.w.Write(p)

	w.mutex.Lock()
	defer w.mutex.Unlock()

	w.total += int64(n)
	w.nops++

	return n, err
}

func (w *SimpleWriteCounter) WriteCount() (n int64, nops int) {
	w.mutex.RLock()
	defer w.mutex.RUnlock()

	return w.total, w.nops
}
