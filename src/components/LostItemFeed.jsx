{item.claimed ? (
  <p className="text-green-600 font-bold">✅ Already Claimed</p>
) : (
  <>
    <p className="text-sm text-gray-700 font-medium">
      🔒 Secret Q: {item.secretQuestion}
    </p>
    <ClaimForm item={item} />
  </>
)}
