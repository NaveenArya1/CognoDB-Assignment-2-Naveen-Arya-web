---
name: fix-graph-visualization
description: Fix graph visualization issues where nodes are packed in center, labels appear in wrong circle, and edges are outside nodes
metadata:
  type: project
---

## Issue Analysis

Based on code review, the graph visualization problems stem from a scaling inconsistency in the GraphEdge component:

1. **Nodes packed in center appearance**: Node visual elements (spheres) are too large relative to their spacing due to scaling factor, causing heavy overlap that makes them appear clustered.

2. **Labels in other circle**: While labels are positioned correctly relative to nodes, the heavy node overlap makes the label positions appear to form a distinct pattern.

3. **Edges outside nodes**: The GraphEdge component incorrectly scales node positions by `scaleFactor` when drawing edges, while GraphNode positions itself at the unscaled logical positions.

## Root Cause

In `GraphEdge.tsx`, line 40-48:
```typescript
const geometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(
    sourceNode.position[0] * scaleFactor,  // BUG: Should not scale
    sourceNode.position[1] * scaleFactor,
    sourceNode.position[2] * scaleFactor,
  ),
  new THREE.Vector3(
    targetNode.position[0] * scaleFactor,  // BUG: Should not scale
    targetNode.position[1] * scaleFactor,
    targetNode.position[2] * scaleFactor,
  ),
]);
```

While in `GraphNode.tsx`, the positioning is correct:
```typescript
<group position={node.position}>  // Correct: logical position, no scaling
<mesh><sphereGeometry args={[0.1 * scaleFactor, 32, 32]} /></mesh>  // Correct: visual size scaled
```

## Solution

Fix the GraphEdge component by removing the incorrect scaling of position values:

1. **Primary Fix**: In GraphEdge.tsx, modify the BufferGeometry.setFromPoints call to use unscaled node positions:
   ```typescript
   const geometry = new THREE.BufferGeometry().setFromPoints([
     new THREE.Vector3(
       sourceNode.position[0],  // FIXED: Removed * scaleFactor
       sourceNode.position[1],  // FIXED: Removed * scaleFactor
       sourceNode.position[2],  // FIXED: Removed * scaleFactor
     ),
     new THREE.Vector3(
       targetNode.position[0],  // FIXED: Removed * scaleFactor
       targetNode.position[1],  // FIXED: Removed * scaleFactor
       targetNode.position[2],  // FIXED: Removed * scaleFactor
     ),
   ]);
   ```

2. **Secondary Consideration**: If node overlap is still too severe after the fix, consider reducing the sphere size in GraphNode.tsx:
   ```typescript
   // Change from:
   <sphereGeometry args={[0.1 * scaleFactor, 32, 32]} />
   // To something like:
   <sphereGeometry args={[0.05 * scaleFactor, 32, 32]} />
   ```

## Implementation Plan

1. Apply the fix to GraphEdge.tsx
2. Test the graph visualization to confirm:
   - Nodes are properly distributed (not packed in center)
   - Edges connect correctly to nodes
   - Label positioning looks appropriate
3. If needed, adjust sphere size for better visual separation
4. Verify all interactive features (hover, click, path highlighting) still work correctly

## Files to Modify
- `src/components/graph/GraphEdge.tsx` - Fix position scaling bug