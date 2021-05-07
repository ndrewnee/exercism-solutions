package account

import "sync"

type Account struct {
	mutex   sync.RWMutex
	balance int64
	closed  bool
}

func Open(initialDeposit int64) *Account {
	if initialDeposit < 0 {
		return nil
	}

	return &Account{balance: initialDeposit}
}

func (a *Account) Close() (payout int64, ok bool) {
	a.mutex.Lock()
	defer a.mutex.Unlock()

	if a.closed {
		return 0, false
	}

	a.closed = true

	return a.balance, true
}

func (a *Account) Balance() (balance int64, ok bool) {
	a.mutex.RLock()
	defer a.mutex.RUnlock()

	if a.closed {
		return 0, false
	}

	return a.balance, true
}

func (a *Account) Deposit(amount int64) (newBalance int64, ok bool) {
	a.mutex.Lock()
	defer a.mutex.Unlock()

	if a.closed {
		return 0, false
	}

	newBalance = a.balance + amount

	if newBalance < 0 {
		return 0, false
	}

	a.balance = newBalance

	return newBalance, true
}
