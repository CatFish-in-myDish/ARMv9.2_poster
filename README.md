# ARMv9.2-A Architecture Poster Project

A high-performance, visually rich interactive poster detailing the **ARMv9.2-A (AArch64)** architecture. This project showcases the evolution of RISC compute with a focus on confidential computing, AI acceleration, and modern memory safety.

---

## 🚀 Key Features of ARMv9.2-A

ARMv9.2-A builds upon the foundations of ARMv9.0 and v9.1, introducing critical enhancements for enterprise, cloud, and AI workloads:

### 1. Realm Management Extension (RME) & Arm CCA
The cornerstone of **Arm Confidential Compute Architecture (Arm CCA)**.
- **Security States**: Introduces 4 hardware-enforced security states: **Root**, **Realm**, **Secure**, and **Non-Secure**.
- **Isolation**: Protects "Realms" (confidential VMs/workloads) from the host OS and Hypervisor, preventing even privileged software from accessing Realm memory.
- **Granule Protection Check (GPC)**: A hardware mechanism that provides fine-grained, dynamic memory isolation checks at the physical address level.

### 2. Branch Record Buffer Extension (BRBE)
- **Enhanced Telemetry**: Provides hardware-based recording of execution branches with support for **EL3** (highest privilege).
- **Auto-FDO Integration**: Enables automatic Feedback-Directed Optimization, allowing compilers to use real-world execution paths for aggressive performance tuning.
- **Profiling**: Essential for identifying and resolving deep performance bottlenecks in complex software stacks.

### 3. Scalable Matrix Extension 2 (SME2)
- **High-Throughput AI**: Dramatically improves matrix operations used in LLMs and Transformers.
- **Multi-Vector Instructions**: Introduces multi-vector data processing, enabling higher parallelism than standard SIMD or SME.
- **Quantized Data Support**: Native support for **INT2** and **INT4** formats, crucial for modern efficient neural network inference.
- **Predicate-as-Counter**: A specialized mechanism for efficient handling of variable-length matrix and vector loops.

### 4. 64-Byte Atomic Load/Store
- **High Concurrency**: Facilitates efficient, single-copy atomic operations on larger data blocks.
- **Accelerator Support**: Critical for high-bandwidth communication between the CPU and hardware accelerators in SoC designs.

---

## 🛠 Architectural Highlights

| Component | Specification | Description |
| :--- | :--- | :--- |
| **ISA** | AArch64 (A64) | Fixed 32-bit width RISC instruction set. |
| **Registers** | GPR, SP, PC, V/Z/ZA | 31× 64-bit GPRs + SME ZA-tiles for matrix compute. |
| **Pipeline** | Out-of-Order (OOO) | 8-wide Fetch/Decode/Dispatch (Cortex-X4). |
| **L1 Cache** | 64KB I + 64KB D | High-bandwidth split caches for immediate access. |
| **Security** | MTE, PAC, BTI | Hardware protection against buffer overflows and ROP/JOP attacks. |

---

## � References & Further Reading

For more technical depth, industrial implementers and researchers should refer to:

- [1] **Arm Developer**: [Armv9-A Architecture Profile](https://developer.arm.com/architectures/cpu-architecture/a-profile/armv9-a)
- [2] **Whitepaper**: [Realm Management Extension (RME) System Architecture](https://developer.arm.com/documentation/den0129/latest/)
- [3] **Arm Newsroom**: [SME2 Technology and On-Device AI Innovation](https://www.arm.com/news/2023/05/arm-sme2-ai-innovation)
- [4] **USENIX**: [Enabling Realms with Arm Confidential Compute Architecture](https://www.usenix.org/conference/atc23/presentation/li-ziyuan)
- [5] **Arm Documentation**: [SME and SME2 Overview](https://developer.arm.com/documentation/102374/0101)
- [6] **Technical Manual**: [Arm Architecture Reference Manual for A-profile](https://developer.arm.com/documentation/ddi0487/latest/)

---

## 👥 Team Details (Batch 2024–28)
- **P SANJAY** (CB.SC.U4CSE24240)
- **P BHAVITH MADHU** (CB.SC.U4CSE24241)
- **RAGHAV VS** (CB.SC.U4CSE24243)
- **R VIKRANTH** (CB.SC.U4CSE24244)
