# 🏦 FinTech Scam Detection System - Architecture & Design

## 1. System Architecture
**Hybrid Graph-Relational Architecture** designed for high-performance money tracing.

### 🏛 Database Schema (PostgreSQL + Graph Concept)

#### `users`
| Field | Type | Description |
|-------|------|-------------|
| `account_id` | UUID (PK) | Unique identifier |
| `kyc_level` | ENUM | LOW, MEDIUM, HIGH |
| `risk_score` | FLOAT | 0.0 - 100.0 |
| `created_at` | TIMESTAMP | Account age |
| `device_id` | STRING | Linked hardware ID |

#### `transactions`
| Field | Type | Description |
|-------|------|-------------|
| `txn_id` | UUID (PK) | Unique transaction ID |
| `global_trace_id` | UUID | **Persistent ID** for entire money chain |
| `sender_id` | UUID (FK) | Source Account |
| `receiver_id` | UUID (FK) | Destination Account |
| `amount` | DECIMAL | Currency value |
| `timestamp` | TIMESTAMP | Precise time |
| `hop_depth` | INT | Distance from source scam |

---

## 2. Scam Detection Logic (Pseudocode)

### 🕵️‍♂️ Detection Engine
```python
def analyze_transaction(txn):
    # 1. Smurfing Detection (One -> Many)
    if txn.sender.recent_outbound_count > 10 and txn.amount > 100000:
        return RISK_HIGH, "Potential Smurfing / Distributing"

    # 2. Mule Account (Dormant -> Active)
    if txn.sender.is_dormant_90_days and txn.amount > 50000:
        return RISK_CRITICAL, "Dormant Account Sudden Activity"
        
    # 3. Circular Trading (Cycle Detection)
    path = graph.find_path(txn.receiver, txn.sender)
    if path and len(path) > 2:
        return RISK_CRITICAL, f"Circular Money Flow Detected: {len(path)} hops"
```

### 🔁 Retracking Algorithm (The "No Dead Ends" Logic)
```python
def retrack_money(start_txn_id):
    queue = [start_txn_id]
    visited = set()
    graph = []

    while queue:
        current = queue.pop()
        
        # FIND OUTBOUND: Where did money go from here?
        next_hops = db.query(
            "SELECT * FROM txns WHERE sender_id = ? AND timestamp > ? AND timestamp < ? + 1h", 
            current.receiver_id, current.timestamp, current.timestamp
        )
        
        # FLAGGING HEURISTIC: Did they move > 80% of funds?
        for hop in next_hops:
            if hop.amount >= (current.amount * 0.8):
                hop.global_trace_id = current.global_trace_id # Propagate Trace ID
                graph.add_edge(current, hop)
                queue.push(hop)
                
    return graph
```

---

## 3. Dataset Generation Parameters
We will generate **100 Users** and **1000 Transactions** including:

1.  **The "Smurf" Network**: User A sends 50k to 10 different users (B1..B10) in < 10 mins.
2.  **The "Aggregator"**: 20 Users send small amounts to User X (The Kingpin) within 1 hour.
3.  **The "Laundromat"**: A -> B -> C -> D -> E (Rapid hops, changing banks).
4.  **The "Refund Trap"**: User tries to refund *after* moving money to a 3rd account.

---

## 4. UI/UX "World Class" Design
- **Dark Mode FinTech aesthetic** (already established).
- **Interactive Graph**: Force-directed graph for transaction chains.
- **Time Scrubber**: Slider to replay the scam timeline.
- **Heatmaps**: Visual indicators of high-risk nodes.
