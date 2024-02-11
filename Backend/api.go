package main

type APIserver struct {
	listenAddress string
}

func NewAPIServer(listenAddress string) *APIserver {
	return &APIserver{
		listenAddress: listenAddress,
	}
}
