# Design Principles for Applications Deployment

This article is about creating robust distributed systems. The arget audience is system designers, architects, and CTOs.

_Adapted from: [LinkedIn Article](https://www.linkedin.com/pulse/ten-design-principles-azure-applications-alexander-stern/), extending upon a comprehensive [Azure team guide](https://learn.microsoft.com/en-us/azure/architecture/guide/design-principles/) on creating robust distributed systems._

## Essential and Practical Principles for Scalable, Robust, and Manageable Applications
- **Aim for Self-Recovery**: Build self-recovery mechanisms to cope with inevitable system failures. A lack of self-healing can lead to frequent downtimes and strained resources.
  
- **Build in Redundancy**: Eliminate single points of failure with redundancy. A non-redundant system suffers when infrastructure components fail, causing disruptions.
  
- **Reduce Coordination**: Lower inter-service coordination for scalability. Excessive coordination among modules and services complicates data access and code sharing, making scalability a challenge.

- **Plan for Horizontal Scaling**: Prepare the application for horizontal scalability to manage varying demand. Inadequate partitioning and scalability options can cause system overloads.
  
- **Work Around Resource Limits**: Use partitioning to circumvent limitations in databases, networks, and computing power. Without partitioning, the system struggles to distribute load efficiently.

- **Prioritize Operational Efficiency**: Equip operations teams with the necessary tools for effective management. Poorly implemented monitoring and observability tools can make operations chaotic and time-consuming.
  
- **Opt for Managed Services**: Choose Platform as a Service (PaaS) over Infrastructure as a Service (IaaS) when possible. Reliance on familiar, yet less efficient technologies can hinder operational effectiveness.
  
- **Implement Identity as a Service**: Use Identity as a Service (IDaaS) platforms over custom solutions. Custom identity solutions can be resource-intensive and detract from other business priorities.
  
- **Select Optimal Data Storage**: Choose the most suitable storage technology based on your data needs. Suboptimal data storage choices can lead to inefficiencies and may not align with business requirements.

- **Prepare for Continuous Evolution**: Adopt evolutionary design practices for sustained growth and innovation. A rigid service design can stifle both technological and business advancements.
  
- **Align with Business Requirements**: All design choices should be backed by business needs. Failure to do so can result in a product that's not closely aligned with business objectives, impacting its success.

Understanding and implementing these principles are crucial, especially for startups and new product teams. Proper design helps the business grow safely and rapidly, balancing immediate concerns with long-term technological and business goals.

## How Software and Enterprise Architects Contribute

Utilizing the expertise of experienced software and enterprise architects is often essential. These professionals shoulder the responsibility of analyzing the current situation, running proofs of concept, and suggesting improvements. They help businesses gauge where they currently stand, envision a better future, and map out the necessary changes to get there.

### Key Questions Architects Should Ask:
- **Current Architecture**: Understanding the existing system components and their interactions can highlight vulnerabilities and inform potential improvements.
  
- **Observability Tools**: Evaluating key performance metrics over time helps in identifying bottlenecks and components that require scaling.
  
- **Failure Points and Alerts**: Identifying where and how often failures occur, and the speed of alerts, can guide improvements in monitoring and operational processes.

By consistently addressing these questions, product teams mature, operational efficiency improves, and the pace of delivering business features accelerates, thereby increasing customer satisfaction and team morale.

In summary, adhering to these design principles and utilizing architectural expertise can significantly enhance the scalability, resilience, and manageability of Azure-based applications.